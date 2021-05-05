export default function routes (app, addon) {
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json');
  });

  app.get('/linked-bugs', addon.authenticate(), (req, res) => {
    res.render(
      'linked-bugs.jsx', 
    );
  });
}
