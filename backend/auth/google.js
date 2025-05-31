const GoogleStrategy = require('passport-google-oauth20').Strategy;
const supabase = require('../supabaseClient.js');

function googleAuth(passport) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName || '';
      const lastName = profile.name.familyName || '';

      try {
        // Check if user already exists
        let { data: users, error } = await supabase
          .from('auth')
          .select('*')
          .eq('email', email)
          .limit(1);

        if (error) return done(error, null);

        if (!users || users.length === 0) {
          // Insert new user
          let { data: insertedUser, error: insertError } = await supabase
            .from('auth')
            .insert([
              {
                email,
                password: '',
                firstname: firstName,
                lastname: lastName,
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

module.exports = googleAuth;
