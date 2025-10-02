<script lang="ts">
    import API from "$lib/api";
    import Button from "$lib/components/Button.svelte";
    import ErrorMessage from "$lib/components/ErrorMessage.svelte";
    import Form from "$lib/components/Form.svelte";
    import InputField from "$lib/components/InputField.svelte";
    import Spacer from "$lib/components/Spacer.svelte";
    import { TITLE } from "$lib/env";

    export let data;
    let user = data.user;
    let oldPassword = "";
    let newPassword = "";
    let newPasswordConfirm = "";
    let errorMessage = "";

    function updatePassword(event: Event) { 
        event.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            errorMessage = "New passwords do not match";
            return;
        }
        API.Auth.setPassword(oldPassword, newPassword, API.getToken()).then(
            () => {},
            err => { errorMessage = err; }
        );
    }
</script>

<title>Change Password | {TITLE}</title>

<Form id="authentication-box" title="Change Password">
    <InputField id="old-password" type="password" placeholder="Old Password" required bind:value={oldPassword}>Old Password</InputField>
    <InputField id="new-password" type="password" placeholder="New Password" required bind:value={newPassword}>New Password</InputField>
    <InputField id="new-password-confirm" type="password" placeholder="Confirm Password" required bind:value={newPasswordConfirm}>Confirm Password</InputField>
    <Spacer height="1em" />
    <Button action={updatePassword} theme="accent1" width="100%" height="2.5em">Change Password</Button>
    <ErrorMessage error={errorMessage} />
</Form>