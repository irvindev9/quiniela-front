<template>
  <div class="notifications">
    <div class="row mt-3">
        <div class="col-12 text-center">
            <h5>Notificaciones</h5>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-12 col-md-6">
            <div class="mb-4">
                <textarea class="form-control" v-model="message" id="exampleFormControlTextarea1" rows="3" placeholder="Mensaje"></textarea>
            </div>
            <div>
                <label for="active">Activo hasta:</label>
                <input type="date" class="form-control form-control-sm" v-model="activeUntil" id="active">
            </div>
        </div>
        <div class="col-12 col-md-6">
            <label for="color">Color</label>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="color" id="inlineRadio1" value="rgba(157,222,255,.9)">
                <label class="form-check-label text-info" for="inlineRadio1">Info</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="color" id="inlineRadio2" value="rgba(166,239,184,.9)">
                <label class="form-check-label text-success" for="inlineRadio2">Success</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="color" id="inlineRadio3" value="rgba(255,175,180,.9)">
                <label class="form-check-label text-danger" for="inlineRadio3">Danger</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="color" id="inlineRadio4" value="rgba(255,207,165,.9)">
                <label class="form-check-label text-warning" for="inlineRadio4">Warning</label>
            </div>
            <br>
            <label for="color">Posición</label>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="position" id="inlineRadio1" value="topRight">
                <label class="form-check-label" for="inlineRadio1">Arriba-Derecha</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="position" id="inlineRadio2" value="topLeft">
                <label class="form-check-label" for="inlineRadio2">Arriba-Izquierda</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="position" id="inlineRadio3" value="bottomRight">
                <label class="form-check-label" for="inlineRadio3">Abajo-Derecha</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="position" id="inlineRadio4" value="bottomLeft">
                <label class="form-check-label" for="inlineRadio4">Abajo-Izquierda</label>
            </div>
            <button class="btn btn-primary btn-sm mt-4" @click="previewNotification(message, color, position)">
                <i class="bi bi-eye"></i> 
                Previsualizar
            </button>
            <button class="btn btn-primary btn-sm mx-1 mt-4" @click="save">
                <i class="bi bi-send"></i> 
                Guardar
            </button>
        </div>
    </div>
    <hr>
    <div class="row mt-3">
        <div class="col-12 table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Mensaje</th>
                        <th>Activo hasta</th>
                        <th>Color</th>
                        <th>Posición</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="notification in notifications" :key="notification.id" class="notification-tr">
                        <td>{{notification.id}}</td>
                        <td>{{notification.message}}</td>
                        <td>{{notification.active_to}}</td>
                        <td :style="{'color': notification.color, 'background-color': notification.color}">{{notification.color}}</td>
                        <td>{{notification.position}}</td>
                        <td>
                            <span class="badge bg-primary rounded-pill" @click="previewNotification(notification.message, notification.color, notification.position)">
                                <i class="bi bi-eye"></i> 
                                Ver
                            </span>
                            <br>
                            <span class="badge bg-danger rounded-pill" @click="deleteN(notification.id)">
                                <i class="bi bi-trash"></i> 
                                Eliminar
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import iziToast from 'izitoast';
import { IziToastPosition } from 'izitoast';
import { saveNotification, getNotifications, deleteNotification } from '../../../api/adminRequests';
import { Notifications } from '../../../models/Notifications';

const color = ref('rgba(157,222,255,.9)');
const position: Ref<IziToastPosition> = ref('topRight');
const message = ref('');
const activeUntil = ref('');
const notifications: Ref<Notifications> = ref([]);

onMounted(async () => {
    notifications.value = await getNotifications();
});

function previewNotification(message: string, color: string, position: IziToastPosition) {
    iziToast.show({
        title: '',
        message: message,
        color: color,
        position: position,
        close: true,
        timeout: 10000,
    });
}

async function save() {
    await saveNotification({message: message.value, active_to: activeUntil.value, color: color.value, position: position.value});
    notifications.value = await getNotifications();
}

async function deleteN(id: number) {
    await deleteNotification(id);
    notifications.value = await getNotifications();
}
</script>

<style lang="scss">
.notification-tr {
  span.badge {
    cursor: pointer;
  }
}
</style>