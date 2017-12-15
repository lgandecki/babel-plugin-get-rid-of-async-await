test('login correct ', async () => {
  let currentUser = null
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
          currentUser = {uuid: 'test'};
        } else {
          throw new Error('403');
        }
        return currentUser;
      }
    }
  };


  const wrapper = await startApp(resolvers);
  const loginPage = new LoginPage(wrapper);



  await loginPage.setPassword('correctPassword');
  await loginPage.setUsername('correctUsername');
  await loginPage.login();
});


test('login incorrect ', async () => {
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
  const wrapper = await startApp(resolvers);

  const loginPage = new LoginPage(wrapper);
  await loginPage.login();


  loginPage.errorMessage.assertIsVisible()
  loginPage.assertIsActive()
});

class LoginPage {
  constructor (driver) {
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

  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async setUsername(username) {
    await this.loginInput.setValue(username);
  }

  async login() {
    await this.loginButton.click();
  }

  assertIsActive() {
    this.root.assertIsVisible();
  }

  assertNotActive() {
    this.root.assertNotVisible();
  }

}

