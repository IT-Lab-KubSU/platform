<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
  <img style="border-radius: 1em; align-self: center;" src="https://drive.google.com/uc?export=view&id=1_xQWdF3RtL1MRcdDESMPXMBiAQDHCDGT" width="45">
  <h1 style="text-align: center; margin-left: 10px; margin-top: 2px;">IT Lab Platform - Auth Service</h1>
</div>

<div style="display: flex; align-items: center; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <span style="font-size: 20px; margin-right: 10px;">✨</span>
  <span style="font-size: 16px;">
  Эта директория содержит исходный код системы аунтификации приложения "IT Lab Application".
  </span>
</div>

## Structure
```mermaid
graph TD;
    agw-->auth;
    auth-->auth-db;
    auth-db-->auth-db-admin;
```

## Ports
- `8082` - pg Admin
- `3005` - app

## API
- /user
  - /devices
    - POST
    - parameters:
      - uuid: string(UUID)
      - select?:
        - name?: boolean
        - fingerprint?: boolean
        - isBlocked?: boolean
    - return:
      - Array:
        - name?: string
        - fingerprint?: string
        - isBlocked?: boolean
    - The select statement needs at least one truthy value.
