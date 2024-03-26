## 🚀 Quick start

1.  **Initialize dependencies**

    ```shell
    yarn install
    ```

2.  **Start front-end**

    Navigate into src and run yarn start.

    ```shell
    cd src
    yarn start
    ```

    The front-end should be running on "http://localhost:8000/" by default.

    The front-end also comes with a very useful query tool hosted at "http://localhost:8000/___graphql".

4.  **Access back-end**

    Navigate into studio and sanity start.

    ```shell
    cd studio
    sanity start
    OR
    yarn sanity start
    ```

    The back-end is deployed to "http://localhost:3333/" by default.

    You can also access it via https://hospitalnav.sanity.studio/ for the deployed version.

    To have the front-end access the changes made to the database run:
    
    ```shell
    sanity graphql deploy
    ```

    
