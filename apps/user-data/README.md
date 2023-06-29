<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
  <img style="border-radius: 1em; align-self: center;" src="https://drive.google.com/uc?export=view&id=1_xQWdF3RtL1MRcdDESMPXMBiAQDHCDGT" width="45">
  <h1 style="text-align: center; margin-left: 10px; margin-top: 2px;">IT Lab Platform - User Data Service</h1>
</div>

<div style="display: flex; align-items: center; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <span style="font-size: 20px; margin-right: 10px;">✨</span>
  <span style="font-size: 16px;">
  Эта директория содержит исходный код сервиса базовых пользовательских данных приложения "IT Lab Application".
  </span>
</div>

## Ports
- `8083` - pg Admin
- `3002` - app

## Structure
```mermaid
graph TD;
    agw-->user-data;
    user-data-->user-data-db;
    user-data-db-->user-data-pg-admin;
```
