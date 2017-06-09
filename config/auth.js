module.exports = {
    'facebookAuth' : {
        'clientID'        : '190547547543190',
        'clientSecret'    : '491bbeddftyt5uyjhdfgdt3460bc0b9112',
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileFields'   : ['id', 'displayName', 'photos', 'email'],
        'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    },
    'twitterAuth' : {
        'consumerKey'        : 'AHX64HSDol483idSFRRHMxJ1QMvm',
        'consumerSecret'     : 'pZKnAdgfdggsd7sd823otk6hlgeri239g5EHblExrF30W',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },
    'googleAuth' : {
        'clientID'         : '15464323686-1bfdhjyhg54954kevldsi5f9uk9.apps.googleusercontent.com',
        'clientSecret'     : 'S46_ldsh6E8-Lthybn-jshyth',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }
};
