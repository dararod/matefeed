<div align="center">
  <h1>matefeed</h1>
  <h4 align="center">Self-hosteable social network</h4>
</div>

<div align="center">

![Build](https://github.com/matefeed/matefeed/workflows/build/badge.svg)
![Lint](https://github.com/matefeed/matefeed/workflows/lint/badge.svg)

</div>

# Development

## Requirements

- Docker and Docker Compose
- NodeJS

## Getting Started

1. Clone this repository

```bash
git clone https://github.com/matefeed/matefeed.git
```

2. Build Docker images using Docker Compose

```bash
docker-compose up
```

3. In a separate terminal session, install project dependencies.

> It's recommended to use PNPM to manage packages in this project. You can install it using npm by running: `npm install -g pnpm`

```bash
pnpm install
```

4. Run database migrations. Step 1 is required for this step to be accomplished with success.

```bash
pnpm run knex migrate:latest
```

5. Run the server

```bash
pnpm run dev
```

The project must be available on http://localhost:3000.

## Icons

This application uses [Feathericons](https://feathericons.com) to provide icons.
You must import them from the `react-feather` module and use them as specified
here: https://github.com/feathericons/react-feather.

# Contributing

Every kind of contribution to this project is welcome, please, don't hesitate
to open a Pull Request or Issue. I will be happy to help!
