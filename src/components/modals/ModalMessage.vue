<template>
  <div>
    <div class="modal shadow fade confirmationModal" :id="props.modalName" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="props.modalName + 'Label'" v-html="props.title"></h5>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3">
              <p v-html="props.message"></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">
              Cerrrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  modalName: {
    type: String,
    default: 'messageModal'
  },
  title: {
    type: String,
    default: 'Titulo del mensaje'
  },
  message: {
    type: String,
    default: 'Error, revise los datos ingresados'
  }
});


</script>

<style lang="scss">
  .confirmationModal {
    small {
      color: #7f7f7f;
      font-size: 10px;
    }
  }
</style>