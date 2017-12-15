test('login correct ', () => {
  let currentUser = null;
  const resolvers = {
    Query: {
      currentUser() {
        console.log("Gandecki currentUser", currentUser);
        return currentUser;
      }

    },
    Mutation: {
      logIn(a, username, password) {
        if (username === 'correctUsername' && password === 'correctPassword') {
          // currentUser = null;
          currentUser = {
            uuid: 'test'
          };
        } else {
          throw new Error('403');
        }

        return currentUser;
      }

    }
  };
  const wrapper = startApp(resolvers);
  const loginPage = new LoginPage(wrapper);
  loginPage.setPassword('correctPassword');
  loginPage.setUsername('correctUsername');
  loginPage.login();
});
test('login incorrect ', () => {
  const resolvers = {
    Query: {
      currentUser() {
        return null;
      }

    },
    Mutation: {
      logIn() {
        throw new Error('403');
      }

    }
  };
  const wrapper = startApp(resolvers);
  const loginPage = new LoginPage(wrapper);
  loginPage.login();
  loginPage.errorMessage.assertIsVisible();
  loginPage.assertIsActive();
});

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    const root = '.login__form';
    this.selectors = {
      root,
      loginButton: `${root} .button--primary`,
      loginInput: `${root} #username`,
      passwordInput: `${root} #password`,
      errorMessage: `.swal2-shown`
    };
  }

  setPassword(password) {
    this.passwordInput.setValue(password);
  }

  setUsername(username) {
    this.loginInput.setValue(username);
  }

  login() {
    this.loginButton.click();
  }

  assertIsActive() {
    this.root.assertIsVisible();
  }

  assertNotActive() {
    this.root.assertNotVisible();
  }

}

