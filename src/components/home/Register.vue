<template>
  <div class="register-form p-5">
    <div class="form-group title">
      <h3 class="text-center">Registro</h3>
    </div>
    <div class="form-group">
        <label for="email">Correo</label>
        <input type="email" class="form-control" id="email" placeholder="Correo">
    </div>
    <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Contraseña">
    </div>
    <div class="form-group">
        <label for="password">Confirmar contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Contraseña">
    </div>
    <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name" placeholder="Nombre">
    </div>
    <div class="form-group">
        <label for="team">Equipo</label>
        <select class="form-control" id="team">
            <option value="0">Selecciona una opción</option>
            <option>Miami Dolphins</option>
            <option>Buffalo Bills</option>
        </select>
    </div>
    <div class="form-group mt-3 text-end">
      <button class="btn btn-primary btn-block">Registrarse</button>
    </div>
  </div>
</template>

<style lang="scss">
.register-form {
  .form-group {
    margin-top: 10px;
  }
}
</style>