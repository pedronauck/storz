<h2>📝&nbsp; Table of Content</h2>

- [🙋🏻&nbsp; Getting Started](#-getting-started)
- [📟&nbsp; Setup the Project](#-setup-the-project)
- [👨🏻‍💻&nbsp; Development](#-development)
  - [⌨️&nbsp; Global Commands](#️-global-commands)
- [🐞&nbsp; Think you found a bug?](#-think-you-found-a-bug)
- [🙋🏻‍♂️&nbsp; Proposing new or changed API?](#️-proposing-new-or-changed-api)
- [📥&nbsp; Making a Pull Request?](#-making-a-pull-request)
  - [📚&nbsp; Commit Convention](#-commit-convention)
  - [🚶🏻‍♂️&nbsp; Steps to PR](#️-steps-to-pr)
  - [✅&nbsp; Tests](#-tests)
- [📃&nbsp; Want to help improve the docs?](#-want-to-help-improve-the-docs)

---

## 🙋🏻&nbsp; Getting Started

Thanks for showing interest to contribute to Storz, you rock!

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

- ## 📖&nbsp; Heuristics

[heuristic](<https://en.wikipedia.org/wiki/Heuristic_(computer_science)>)
/ˌhjʊ(ə)ˈrɪstɪk/

> A technique designed for solving a problem more quickly when classic methods are too slow, or for finding an approximate solution when classic methods fail to find any exact solution

- Priority is the best User Experience
- Always think about accessibility ([check our document about](./ACCESSIBILITY.md))
- Complexity should be introduced when it’s inevitable
- Code should be easy to reason about
- Code should be easy to delete
- Avoid abstracting too early
- Avoid thinking too far in the future

## 📟&nbsp; Setup the Project

The following steps will get you up and running to contribute to Storz:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/pedronauck/storz))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/storz.git
cd storz
```

3. Setup all the dependencies and packages by running `pnpm`.
4. Run `pnpm build` to bootstrap all dependencies inside our monorepo.

> If you run into any bug during this step, please open an issue for us 🙏🏻

## 👨🏻‍💻&nbsp; Development

To improve our development process, we've set up tooling and systems. Storz
uses a monorepo structure as mentioned in our [README](./README#tools).

### ⌨️&nbsp; Global Commands

| Command               | Description                                     |
| --------------------- | ----------------------------------------------- |
| `pnpm build`          | Exec `build` in all packages                    |
| `pnpm lint`           | Run ESLint and Prettier check against all files |
| `pnpm lint:check`     | Run ESLint check against all files              |
| `pnpm lint:fix`       | Run ESLint with `--fix` agains all files        |
| `pnpm prettier:check` | Run Prettier check agains all files             |
| `pnpm prettier:fix`   | Run Prettiere with `--write` against all files  |
| `pnpm test`           | Exec `test` in all packages                     |

## 🐞&nbsp; Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

## 🙋🏻‍♂️&nbsp; Proposing new or changed API?

Please provide thoughtful comments and some sample API code. Proposals that
don't line up with our roadmap or don't have a thoughtful explanation will be
closed.

## 📥&nbsp; Making a Pull Request?

Pull requests need only the :+1: of two or more collaborators to be merged; when
the PR author is a collaborator, that counts as one.

### 📚&nbsp; Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### 🚶🏻‍♂️&nbsp; Steps to PR

1. Fork of the storz repository and clone your fork

2. Create a new branch out of the `master` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/pedronauck/storz/blob/master/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `pnpm build` and
   `pnpm test` to make sure everything works as expected.

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

### ✅&nbsp; Tests

All commits that fix bugs or add features need a test.

## 📃&nbsp; Want to help improve the docs?

Feel free to open a pull request any time you want with documentation improvements, we'll
be very help with this 🙏🏻
