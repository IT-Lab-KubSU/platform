# Nx Commands
### This command will generate a new React library (React Component) in the libs folder and it will also add all the required script targets in your project.json
```bash
nx g @nrwl/react:lib ui
```
### This command will configure library to be a Storybook library
```bash
nx g @nrwl/react:storybook-configuration --name=ui
```
### This command will generate a new React Story in selected library (component)
```bash
nx g @nrwl/react:stories --project=ui
```
### This command will build Storybook
```bash
nx run ui:build-storybook
```
### This command will run Styorybook
```bash
nx run ui:storybook
```
### This command will generate Storybook Stories
```bash
nx g @nrwl/react:component button --project=ui --export
```
