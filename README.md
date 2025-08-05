# Trip Timeline Planner


- Ruby version

Using Ruby version 3.4.4
Make sure you are using a user-installed Ruby, not your OS's default Ruby.

- System dependencies

Ruby, bundler, NodeJS, yarn, postgresql

- Configuration

Install Ruby dependencies:

```
bundle
```

Install  JS dependencies

```
yarn install
```

- Setup master key

### 🔐 Setup credentials for local development

This project uses Rails encrypted credentials. To run it locally:

1. Generate a new `master.key`:

```bash
EDITOR="code --wait" bin/rails credentials:edit
```

2. Add this in the editor window:

```
devise_jwt_secret_key: YOUR_OWN_SECRET_HERE
```

3. You can generate a secure secret with:

```
ruby -rsecurerandom -e 'puts SecureRandom.hex(32)'
```
4. Save and close. This creates a new `config/master.key` and `credentials.yml.enc`.

You're good to go!

- Database creation, initialization

Seed only if you want to.

```
bin/rails db:create db:migrate db:seed
```

- Run

```
bin/dev
```
