<script setup lang="ts">
const items = [
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
]

// 按钮组
const toggle_exclusive = 1

// 消息条
const snackbar = ref(false)

const message = ref(['1', '2'])
setTimeout(() => {
    message.value.push('111')
}, 3000)

// 日期选择器
const DayJsAdapter = ref()
const log2 = () => {
    console.log(DayJsAdapter.value, "@DayJsAdapter")
}

const dialog = ref(false)
const notifications = ref(false)
const sound = ref(false)
const widgets = ref(false)

</script>

<template>
    <div class="">
        <div class="text-center pa-4">
            <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn prepend-icon="mdi-cog" size="small" text="Settings" v-bind="activatorProps"></v-btn>
                </template>

                <v-card>
                    <v-toolbar>
                        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

                        <v-toolbar-title>Settings11111</v-toolbar-title>

                        <v-toolbar-items>
                            <v-btn text="Save" variant="text" @click="dialog = false"></v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-list lines="two">
                        <v-list-subheader>User Controls</v-list-subheader>

                        <v-list-item subtitle="Set the content filtering level to restrict apps that can be downloaded"
                            title="Content filtering" link></v-list-item>

                        <v-list-item subtitle="Require password for purchase or use password to restrict purchase"
                            title="Password" link></v-list-item>

                        <v-divider></v-divider>

                        <v-list-subheader>General</v-list-subheader>

                        <v-list-item subtitle="Notify me about updates to apps or games that I downloaded"
                            title="Notifications" @click="notifications = !notifications">
                            <template v-slot:prepend>
                                <v-list-item-action start>
                                    <v-checkbox-btn v-model="notifications" color="primary"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>

                        <v-list-item subtitle="Auto-update apps at any time. Data charges may apply" title="Sound"
                            @click="sound = !sound">
                            <template v-slot:prepend>
                                <v-list-item-action start>
                                    <v-checkbox-btn v-model="sound" color="primary"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>

                        <v-list-item subtitle="Automatically add home screen widgets" title="Auto-add widgets"
                            @click="widgets = !widgets">
                            <template v-slot:prepend>
                                <v-list-item-action start>
                                    <v-checkbox-btn v-model="widgets" color="primary"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-dialog>
        </div>
        <v-divider>全屏对话框</v-divider>

        <v-btn @click="log2">点击</v-btn>
        <v-date-picker v-model="DayJsAdapter"></v-date-picker>

        <v-snackbar-queue v-model="message"></v-snackbar-queue>

        <v-btn @click="snackbar = true">展示消息条</v-btn>
        <v-snackbar v-model="snackbar" location="top">
            提示的消息词
            <template #actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-btn-toggle divided v-model="toggle_exclusive">
            <v-btn>按钮1</v-btn>
            <v-btn>按钮2</v-btn>
            <v-btn>按钮3</v-btn>
        </v-btn-toggle>
        <v-timeline align="start">
            <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="item.color" :icon="item.icon" fill-dot>
                <v-card>
                    <v-card-title :class="['text-h6', `bg-${item.color}`]">
                        Lorem Ipsum Dolor
                    </v-card-title>
                    <v-card-text class="bg-white text--primary">
                        <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed
                            euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando
                            voluptatibus, vix an salutandi sententiae.</p>
                        <v-btn :color="item.color" variant="outlined">
                            Button
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
        <NuxtWelcome />
    </div>
</template>

<style scoped lang="scss"></style>