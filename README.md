# Instructions NexusBot

To use this code, follow the instructions:

1) Install all dependencies:

    `npm i`

2) Create a .env file for environment variables in the root directory of this repository, not inside the `src` folder!

3) Create environment variables:
    - **NexusBot_Token** - Your Bot Token
    - **API_KEY** - Your Google Generative AI API Key
    - **MESSAGE_ID** - The ID of the message to which users will react to get roles
    - **ROLE_ID_APPLE** - The role ID for the apple emoji
    - **ROLE_ID_CARROT** - The role ID for the carrot emoji
    - **ROLE_ID_CHILI** - The role ID for the chili emoji
    - **ROLE_ID_CORN** - The role ID for the corn emoji

4) Run `npm run start` or `npm run dev` in the project directory

# Note

- Keep in mind all of the role IDs, channel IDs, etc. were all for my test server that I used for the tutorial. You must configure it yourself by changing the IDs to meet your needs.

# Emoji Role Feature

To set up the emoji role feature:

1) Create a message in your Discord server where users can react to get roles.
2) Copy the message ID and set it as the **MESSAGE_ID** environment variable in your `.env` file.
3) Set the role IDs for each emoji in the `.env` file:
    - **ROLE_ID_APPLE** for the 🍏 emoji
    - **ROLE_ID_CARROT** for the 🥕 emoji
    - **ROLE_ID_CHILI** for the 🌶️ emoji
    - **ROLE_ID_CORN** for the 🌽 emoji
4) Users can now react to the message with the specified emojis to get the corresponding roles.