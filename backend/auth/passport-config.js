const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const supabase = require('../supabaseClient.js'); // your Supabase client instance

function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const { data: users, error } = await supabase
        .from('auth')
        .select('*')
        .eq('email', email);

      if (error) return done(error);
      if (!users || users.length === 0) return done(null, false, { message: 'No user found' });

      const user = users[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const { data: user, error } = await supabase
        .from('auth')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return done(error);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
