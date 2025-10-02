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
    let {email} = user;
    let password = "";
    let errorMessage = "";

    function updateEmail(event: Event) { 
        event.preventDefault();
        API.Auth.setEmail(email, password, API.getToken()).then(
            () => {},
            err => { errorMessage = err; }
        );
    }
</script>
<title>Settings | {TITLE}</title>

<Form id="authentication-box" title="Settings">
    <InputField id="email" type="email" placeholder="Email" bind:value={email}>Email</InputField>
    <InputField id="password" type="password" placeholder="Password" bind:value={password}>Password</InputField>
    <Spacer height="1em" />
    <Button action={updateEmail} theme="accent1" width="100%" height="2.5em">Update</Button>
    <ErrorMessage error={errorMessage} />
</Form>
