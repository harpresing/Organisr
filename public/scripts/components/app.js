module.exports = {
  templateUrl: "./partials/components/app.html",
  $routeConfig: [
    {path: '/', name: 'Home', component: 'home', useAsDefault: true},
    {path: '/my-session', name: 'MySession', component: 'mySession' },
    {path: '/manage-session', name: 'ManageSession', component: 'manageSession' }
  ]
};
