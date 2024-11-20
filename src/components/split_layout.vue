<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<template>
    <div class="">
        <div class="row">
            <div class="col-12"> 
                <slot name="top"></slot>
            </div>
            <div class="col-md-6 col-12">
                <slot name="left"></slot>
            </div>
            <div class="col-md-6 col-12">
                <slot name="right"></slot>
            </div>
            <div> 
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style></style>