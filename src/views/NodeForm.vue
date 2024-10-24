<template>
    <div class="">
        <div class="d-flex flex-column justify-content-between">
            <div class="">
                <div class="input-group ">
                    <span class="input-group-text">Lable</span>
                    <div class="form-floating " :class="nodeLable == '' ? 'is-invalid' : ''">
                        <input type="text" class="form-control" :class="nodeLable == '' ? 'is-invalid' : ''"
                            v-model="nodeLable" id="floatingInputGroup2" placeholder="Username" required>
                        <label for="floatingInputGroup2">Lable</label>
                    </div>
                    <div class="invalid-feedback" v-if="nodeLable == ''">
                        Please choose a lable.
                    </div>
                </div>
                <div class="py-2">
                    <p class="p-0 my-2">Other Option</p>
                    <hr class="my-0 " />
                </div>
                <div class="my-2">
                    <div class="input-group my-3">
                        <span class="input-group-text">Duration</span>
                        <div class="form-floating " :class="nodeLable == '' ? 'is-invalid' : ''">
                            <input type="text" class="form-control" :class="nodeLable == '' ? 'is-invalid' : ''"
                                v-model="otherDetails.duration" id="floatingInputGroup2" placeholder="Username"
                                required>
                            <label for="floatingInputGroup2">duration</label>
                        </div>

                    </div>
                    <div class="input-group my-3">
                        <span class="input-group-text">user Info.</span>
                        <div class="form-floating " :class="nodeLable == '' ? 'is-invalid' : ''">
                            <textarea class="form-control" :class="nodeLable == '' ? 'is-invalid' : ''"
                                v-model="otherDetails.userInfo" id="floatingInputGroup2" placeholder="Username" required
                                style="height: 100px" />
                            <label for="floatingInputGroup2">user Information</label>
                        </div>

                    </div>
                    <div class="input-group my-3">
                        <span class="input-group-text">campaign</span>
                        <div class="form-floating " :class="nodeLable == '' ? 'is-invalid' : ''">
                            <textarea type="text-area" class="form-control" :class="nodeLable == '' ? 'is-invalid' : ''"
                                v-model="otherDetails.campaign" id="floatingInputGroup2" placeholder="Username" required
                                style="height: 100px" />
                            <label for="floatingInputGroup2">campaign</label>
                        </div>

                    </div>
                </div>
            </div>
            <div class="">
                <div class="container d-flex justify-content-end">
                    <button class="btn btn-danger  mx-2" @click="emit('closeModel')">
                        cancel
                    </button>
                    <button class="btn btn-primary " @click="saveNode">
                        save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useFlowStore } from "@/stores/flowStore"

const emit = defineEmits()
emit('closeModel')

const flowStore = useFlowStore();

const { selectedNode, updateNode } = flowStore;
const nodeLable = new ref("");
const otherDetails = new ref({
    duration: 0,
    userInfo: " ",
    campaignInfo: " ",
    languages: [],
});

onMounted(() => {
    nodeLable.value = selectedNode?.data?.label;
    // fetch data if present
    otherDetails.value.duration = selectedNode?.data?.duration || 0;
    otherDetails.value.userInfo = selectedNode?.data?.userInfo || "";
    otherDetails.value.campaignInfo = selectedNode?.data?.campaignInfo || "";
    otherDetails.value.languages = selectedNode?.data?.languages || [];
})

const saveNode=()=> {
    const updatedNode = { label: nodeLable.value, duration: otherDetails.value.duration, userInfo: otherDetails.value.userInfo, campaignInfo: otherDetails.value.campaignInfo, languages: otherDetails.value.languages };
    updateNode(selectedNode.id,updatedNode);
    emit('closeModel')
}

</script>