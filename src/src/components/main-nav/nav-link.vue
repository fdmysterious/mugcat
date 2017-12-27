<template lang="pug">
router-link( :to="to" class="nav-link")
    i( :class="classList" )
    span.subtitle {{ text }}
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class NavLink extends Vue
{
    @Prop()
    to : string;
    @Prop()
    icon : string;
    @Prop()
    text : string;

    get classList() : string {
        return "fa fa-" + this.icon;
    }

}
</script>

<style lang="scss">
.nav-link {
    @include no-outline();

    position : relative;
    white-space : nowrap;
    overflow    : visible;

    color : $color-magenta;

    &:hover {
        color : lighten( $color-magenta, 20 );
        & > .subtitle {
            opacity : 1;
        }
    }

    &:active {
        color : rgba( 0,0,0,0 );
        text-shadow : 0px 0px 2px lighten( $color-magenta, 20 );
    }

    & > i {
        font-size : 2.8em;
    }
        

    & > .subtitle {
        position : absolute;
        left     : 50%;
        top      : 100%;
        text-align : center;
        
        transform : translate( -50%, .5em );
        opacity : 0;
		transition : opacity 200ms ease
    }

    @media( max-width : $size-tablet ) {
        & > .subtitle {
            opacity : 1;
        }

        & > i {
            font-size : 2em;
        }
    }
}

</style>
