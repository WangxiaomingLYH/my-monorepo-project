<script setup lang="ts">
const props = defineProps({
    headings: {
        type: Object,
        require: true
    }
})

onMounted(() => {
    console.log(props.headings, "@props")
})
</script>

<template>
    <v-navigation-drawer>
        <v-list nav>
            <v-list-item title="Drawer left" link></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>