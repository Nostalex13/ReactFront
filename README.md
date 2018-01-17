# Setting up
* Install .NET Core

https://www.microsoft.com/net/learn/get-started/macos

* Clone repo

```bash
git clone https://gitlab.com/Fritzenator/campus-manager.git
```

* Make suge project boilerplate is running

```bash
cd path/to/local/repo
cd CampusManager
dotnet run
```

# Git flow

**master** is protected branch used to get all the modules together. It will contain features that pass the initial sanity and workability check and that are okay for demo.

In order to put your code to the repo, open up your branch called
#### feature/*your-feature-name*
originating from **master**. To do this, input

```bash
cd path/to/local/repo
git chechout master
git checkout -b feature/make-some-stuff
```

When you are done, push your code to origin using:

```bash
git push -u origin feature/make-some-stuff
```

### To see README on frontend stuff, check out /CampusManager/client/README.md.