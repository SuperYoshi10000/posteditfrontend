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
    let password = "";
    let errorMessage = "";

    function login(event: Event) { 
        event.preventDefault();
        API.Auth.login(name, password).then(
            () => { goto("/"); },
            err => { errorMessage = err; }
        );
    }
</script>
<title>Login | {TITLE}</title>

<Form id="authentication-box" title="Login">
    <InputField id="username" type="email" placeholder="Username" bind:value={name}>Username</InputField>
    <InputField id="password" type="password" placeholder="Password" bind:value={password}>Password</InputField>
    <Spacer height="1em" />
    <Button action={login} theme="accent1" width="100%" height="2.5em">Login</Button>
    <ErrorMessage error={errorMessage} />
</Form>