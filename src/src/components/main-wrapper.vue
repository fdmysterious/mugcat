<template lang="pug">
main.main-wrapper( role="main" key="main-wrapper" )
        slot
</template>

<script lang="ts">
export default{}
</script>

<style lang="scss">
.main-wrapper {
    @include make-container(
        $size-main-container-fixed,
        $size-main-container-rel,
        $size-main-container-margin
    );
    z-index  : 200;

    margin-top : $size-main-container-top;
    margin-bottom : 1rem;

    padding : 2em;
    @media( max-width : $size-mobile ) {
        padding-left  : 1em;
        padding-right : 1em;
        width : 100%;
    }

    background : $color-background-content;
}
</style>
