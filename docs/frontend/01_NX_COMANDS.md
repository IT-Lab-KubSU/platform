# Nx Commands
### This command will generate a new React project in the libs folder and it will also add all the required script targets in your workspace.json
```bash
nx g @nrwl/react:lib ui
```
### This command will configure library to be a Storybook library
```bash
nx g @nrwl/react:storybook-configuration --name=ui
```
### This command will build Storybook
```bash
nx run ui:build-storybook
```
### This command will run Storybook
```bash
nx run ui:storybook
```
### This command will generate Storybook Stories
```bash
nx g @nrwl/react:component button --project=ui --export
```
