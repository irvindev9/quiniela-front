<template>
  <div class="first-places row mx-0">
    <div class="col second-place">
      <div class="circle shadow-sm">
        <img src="https://picsum.photos/200" alt="img">
        <div class="place-holder">
          <span>2</span>
        </div>
      </div>
      <p>
        <small>Miguel Lopez</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">97 pts</span>
      </p>
    </div>
    <div class="col">
      <div class="circle shadow-sm">
        <img src="https://picsum.photos/200" alt="img">
        <div class="place-holder">
          <span>1</span>
        </div>
      </div>
      <p>
        <small>Luis Lopez</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">98 pts</span>
      </p>
    </div>
    <div class="col second-place">
      <div class="circle shadow-sm">
        <img src="https://picsum.photos/200" alt="img">
        <div class="place-holder">
          <span>3</span>
        </div>
      </div>
      <p>
        <small>Gerardo Mtz</small>
        <br>
        <span class="badge rounded-pill bg-light text-dark">96 pts</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
$sm: 576px;
$md: 768px;

.first-places {
  display: flex;
  justify-content: space-between;
  align-items: end;

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin: auto;
    border: 3px solid rgba(180, 180, 180, 0.5);
    cursor: default !important;
    
    

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .place-holder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .place-holder:hover {
      display: none;
    }
  }

  .second-place {
    .circle {
      width: 80px;
      height: 80px;
    }
  }

  .col {
    p {
      font-size: smaller;

      @media (min-width: $md) {
        font-size: medium;
      }
    }
  }
}
</style>