const MicrosoftStrategy = require('passport-azure-ad').OIDCStrategy;
const supabase = require('../supabaseClient.js');

function microsoftAuth(passport) {
  passport.use(new MicrosoftStrategy(
    {
      identityMetadata:
        'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      responseType: 'code',
      responseMode: 'query',
      redirectUrl: process.env.MICROSOFT_CALLBACK,
      scope: ['profile', 'email'],
    },
    async (iss, sub, profile, accessToken, refreshToken, done) => {
      const email = profile._json.preferred_username;
      const firstName = profile.name?.givenName || '';
      const lastName = profile.name?.familyName || '';
      const displayName = `${firstName} ${lastName}`.trim();

      try {
        // Check if user exists
        let { data: users, error } = await supabase
          .from('auth')
          .select('*')
          .eq('email', email)
          .limit(1);

        if (error) return done(error, null);

        if (!users || users.length === 0) {
          // Insert new user with display name
          let { data: insertedUser, error: insertError } = await supabase
            .from('auth')
            .insert([
              {
                email: email,
                password: '',
                firstname: firstName,
                lastname: lastName,
                display_name: displayName,
              },
            ])
            .select()
            .single();

          if (insertError) return done(insertError, null);

          return done(null, insertedUser);
        }

        // User exists
        return done(null, users[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  ));
}

module.exports = microsoftAuth;
