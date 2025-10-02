<script lang="ts">
    import { goto } from "$app/navigation";
    import API from "$lib/api";
    import Button from "$lib/components/Button.svelte";
    import ErrorMessage from "$lib/components/ErrorMessage.svelte";
    import Form from "$lib/components/Form.svelte";
    import InputField from "$lib/components/InputField.svelte";
    import Spacer from "$lib/components/Spacer.svelte";
    import { TITLE } from "$lib/env";

    let name = "";
    let email = "";
    let password = "";
    let passwordConfirm = "";
    let errorMessage = "";

    function register(event: Event) { 
        event.preventDefault();
        if (password !== passwordConfirm) {
            errorMessage = "Passwords do not match";
            return;
        }
        API.Auth.register({name, email, password}).then(
            () => { goto("/"); },
            err => { errorMessage = err; }
        );
    }
</script>
<title>Register | {TITLE}</title>

<Form id="authentication-box" title="Register">
    <InputField id="username" type="text" placeholder="Username" bind:value={name}>Username</InputField>
    <InputField id="email" type="email" placeholder="Email" bind:value={email}>Email</InputField>
    <InputField id="password" type="password" placeholder="Password" bind:value={password}>Password</InputField>
    <InputField id="password-confirm" type="password" placeholder="Confirm Password" required bind:value={passwordConfirm}>Confirm Password</InputField>
    <Spacer height="1em" />
    <Button action={register} theme="accent1" width="100%" height="2.5em">Register</Button>
    <ErrorMessage error={errorMessage} />
</Form>