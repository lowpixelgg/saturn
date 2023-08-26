# Guide for collaborators
So you've decided to become a contributor to our project. Great!
We're always looking for new developers, so if you're new, check out our getting started guide.
But before we start accepting your code, there are a few things you should know about how we work.

This document mainly contains guidelines and rules on how your code should be structured and how it can be committed without upsetting any fellow contributors.


# Which branch should I use?
As a potential new contributor, you will need to fork our repository and commit to your own “branch”. Then you can send us a pull request.

Our MAIN branch is the main development branch that contains the latest, state-of-the-art code.

Our other branches contain innovative research, radical ideas, and other ongoing changes that are to be incorporated into MAIN at a later date.

If you are a contributor, the choice is yours: push branches to this repository or your own fork.

Branches are “updated” and should not be “personal” for each user. This means that a branch should be created for a new feature, not a specific user playground.


# What to program
Generally, try to submit pull requests that resolve existing issues.
If you're looking for something to work on, take a look at the "good first edit" label or our macros.

Of course, if you are interested in something else, feel free to try and submit. But discussing the feature early on in an issue will increase the likelihood that your pull request will be merged in a timely manner.


# "Committing" code
Make sure your code contributions follow the Style Guide.

Commits must be tested when added to master. Commits that 'need to be fixed later' and that directly affect the state of the system will be rolled back except in exceptional circumstances.

**Commit messages must**

- be consistent
- Always give a clear indication of what has changed without having to look at the code
- Include issue numbers, using GitHub keywords where necessary
- Follow the seven rules identified here
- The most important of the seven rules have been copied below, but read the article:
- Always use English to facilitate the work of the collaborating colleague.

Separate the subject from the body with a blank line
- Limit the subject line to around 60-80 characters
- Use the imperative mood in the subject line
- Use the body to explain what and why versus how
- Follow-up commits (addendum) must refer to the previous commit. Do this by including the previous SHA commit identifier and, if present - Space, a summary commit message in the new commit message. Doing so will help identify related commits if they are viewed later.

Try to keep pull requests small - they should do one thing. When you do multiple things in a pull request, it's hard to review. If you're fixing things as you go, you might want to make atomic commits and then pick those commits into separate branches, leaving the pull request clean.


**Examples.** Here are some examples of commit messages with a short, descriptive title in the imperative mood.
```
Fix database connection at @services/prisma/connection.ts

Fixed 2 connection problems:
- Disconnect after some random connection
- Disconnect after random user send information
```

Here's a longer description that explains how to use the feature. The body has 60 characters.
```
Add "in-memory-database" of "Player Playground"

Some vite tests were missing during yarn test, this was caused by missing in-memory database
from PlayerPlayground.ts
```

Here we say Fix #1115 to have GitHub automatically close issue #1115. There is no description.
```
Fix #1115: add async encode/decodeString
```

There were no specific issues being fixed here, but GitHub's squash-merge resource was automatically attached (#1177), telling you which pull request created this commit. There is no description.
```
Add "remember this option" checkbox to UserPlayground (#1177)
```

Here we refer to a previous commit.
```
Addendum to a80f8d6: fix Connection handler
```

# Code review
Contributors should try to review other contributors' commits and provide as much feedback as possible.

**Gain and lose merge rights**
Merge rights allow you to merge your own approved pull requests and review other people's pull requests.

We grant merge rights after you've proven yourself competent, which is usually after 3-5 pull requests. This is not fixed and depends on the extent of your contributions, community status and other factors.

The subject of your pull requests doesn't matter — we're more interested in, once granted merge rights, whether you're able to maintain a high standard of code and remain cohesive with other contributors to the project.

Once you get merge rights, if your contributions are of a consistently low standard or if you don't follow the rules, your permissions will be revoked.

# Merging pull requests
Prior to the merge, enforced by GitHub's branch protection, pull requests require:

- If the pull request is large, try to merge only if there are at least 2 pull request revisions. This is not enforced via affiliate protection, but try to follow this convention (...unless nobody else is reviewing your PR).

- Branch protection is not applied to repository administrators, so these people are not required to submit pull requests. Individual repository administrators can, for the greater good, commit to submitting pull requests despite the lack of enforcement.

- For informational purposes, the current repository admins are those marked as members in Github Teams.

Generally use the "Squash and merge" button. If multiple commits are needed because you think having separate commits is useful, use "Rebase and merge".



This article was based on: [MTA CONTRIBUTING.md](https://github.com/multitheftauto/mtasa-blue/blob/master/CONTRIBUTING.md)