<template>
    <Page>
        <ActionBar :title="msg"/>
        <StackLayout orientation="vertical">
            <Button automationText="mainMenuCatsButton" text="Cats"/>
            <Button automationText="mainMenuDogsButton" text="Dogs"/>
            <Button automationText="mainMenuCaribousButton" text="Caribous"/>
        </StackLayout>
    </Page>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
