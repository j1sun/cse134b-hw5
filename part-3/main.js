window.addEventListener('DOMContentLoaded', function () {
  function createLoginDialog() {
    let dialog = document.createElement('dialog');

    dialog.innerHTML = `
      <form>
        <fieldset>
          <legend>Login</legend>
          <div>
            <label for="email">Email</label>
            <input id="email" name="email" type="email">
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password">
          </div>
          <menu>
            <button type="button" class="secondary-button">Cancel</button>
            <button type="submit" class="primary-button">Login</button>
          </menu>
        </fieldset>
      </form>`;

    dialog.querySelector('.primary-button').addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

          // Make all posts editable
          Array.from(document.querySelectorAll('blog-post')).forEach(post => {
            post.editable = true;
          })

          dialog.remove();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(`${errorCode}: ${errorMessage}`);
        });
    });

    dialog.querySelector('.secondary-button').addEventListener('click', () => {
      dialog.remove();
    })

    document.querySelector('main').appendChild(dialog);
    dialog.showModal();
  }

  function logout() {
    firebase.auth().signOut()
      .then(() => {
        Array.from(document.querySelectorAll('blog-post')).forEach(post => {
          post.editable = false;
        })

        document.querySelector('#add-button').style.visibility = 'hidden';
      });
  }

  function getBlogs() {
    let db = firebase.firestore();

    db.collection('blogs').orderBy('date', 'desc')
      .onSnapshot(doc => {
        document.querySelector('#blog-list').innerHTML = '';
        doc.forEach(blogInfo => {
          const title = blogInfo.get('title');
          const date = blogInfo.get('date').toDate().toISOString().split('T')[0];
          const content = blogInfo.get('content');
          const author = blogInfo.get('author');

          let blogElement = document.createElement('blog-post');
          blogElement.setAttribute('data-id', blogInfo.id);
          blogElement.innerHTML = `
          <span slot="title">${title}</span>
          <span slot="date">${date}</span>
          <span slot="content">${content}</span>
          <span slot="author">${author}</span>
          `
          if (firebase.auth().currentUser) {
            blogElement.editable = true;
          }

          document.querySelector('#blog-list').append(blogElement);
        })
      });
  }

  function createAddDialog() {
    let dialog = document.createElement('dialog');

    dialog.innerHTML = `
      <form>
        <fieldset>
          <legend>Add Blog</legend>
          <div>
            <label for="add-title">Title</label>
            <input id="add-title" name="add-title">
          </div>
          <div>
            <label for="add-content">Content</label>
            <textarea id="add-content" name="add-content"></textarea>
          </div>
          <menu>
            <button type="button" class="secondary-button">Cancel</button>
            <button type="submit" class="primary-button">Add</button>
          </menu>
        </fieldset>
      </form>`;

    dialog.querySelector('.primary-button').addEventListener('click', (e) => {
      e.preventDefault();
      const title = document.querySelector('#add-title').value;
      const content = document.querySelector('#add-content').value;

      firebase.firestore().collection('blogs').add({
        title: title,
        date: new Date(),
        content: content,
        author: firebase.auth().currentUser.email,
      });

      dialog.remove();
    });

    dialog.querySelector('.secondary-button').addEventListener('click', () => {
      dialog.remove();
    })

    document.querySelector('main').appendChild(dialog);
    dialog.showModal();
  }

  getBlogs();
  document.querySelector('#add-button').addEventListener('click', createAddDialog);


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in
      document.querySelector('#add-button').style.visibility = 'visible';
      document.querySelector('#login-button').removeEventListener('click', createLoginDialog);
      document.querySelector('#login-button').addEventListener('click', logout);
      document.querySelector('#login-button').textContent = 'Log out';
    } else {
      // User is not signed in.
      document.querySelector('#login-button').removeEventListener('click', logout);
      document.querySelector('#login-button').textContent = 'Login';
      document.querySelector('#login-button').addEventListener('click', createLoginDialog);
    }
  });

});