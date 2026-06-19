const graspVideoSets = [
  { folder: "01_screw", files: ["P5260136.mp4", "P5260138.mp4", "P5260139.mp4"] },
  { folder: "02_binder_clip", files: ["P5260140.mp4", "P5260141.mp4", "P5260142.mp4"] },
  { folder: "03_mahjong_tile", files: ["P5260128.mp4", "P5260130.mp4", "P5260131.mp4"] },
  { folder: "04_leap_fingertip", files: ["P1010012.mp4", "P1010013.mp4", "P1010014.mp4"] },
  { folder: "05_tube", files: ["P1010002.mp4", "P1010004.mp4", "P1010005.mp4", "P1010008.mp4", "P1010009.mp4", "P1010011.mp4"] },
  { folder: "06_mickey_mouse_toy", files: ["P1010019.mp4", "P1010020.mp4", "P1010021.mp4", "P1010022.mp4", "P1010023.mp4", "P1010024.mp4"] },
  { folder: "07_can", files: ["P1010025.mp4", "P1010026.mp4", "P1010027.mp4", "P1010028.mp4", "P1010029.mp4", "P1010030.mp4"] },
  { folder: "08_pepper", files: ["P1010031.mp4", "P1010032.mp4", "P1010033.mp4"] },
  { folder: "09_cup", files: ["P1010034.mp4", "P1010035.mp4", "P1010036.mp4", "P1010037.mp4", "P1010039.mp4", "P1010040.mp4"] },
  { folder: "10_plush_penguin", files: ["P1010041.mp4", "P1010042.mp4", "P1010043.mp4", "P1010044.mp4", "P1010045.mp4", "P1010046.mp4"] },
  { folder: "11_dragon_toy", files: ["P5250048.mp4", "P5250049.mp4", "P5250050.mp4", "P5250051.mp4", "P5250052.mp4", "P5250053.mp4"] },
  { folder: "12_bottle", files: ["P5250054.mp4", "P5250055.mp4", "P5250056.mp4", "P5250057.mp4", "P5250058.mp4", "P5250059.mp4"] },
  { folder: "13_tea_canister", files: ["P5250060.mp4", "P5250061.mp4", "P5250062.mp4", "P5250063.mp4", "P5250064.mp4", "P5250065.mp4"] },
  { folder: "14_cheezit_box", files: ["P5250066.mp4", "P5250067.mp4", "P5250068.mp4", "P5250069.mp4", "P5250070.mp4", "P5250071.mp4"] },
  { folder: "15_cleaning_spray", files: ["P5250076.mp4", "P5250077.mp4", "P5250078.mp4"] },
  { folder: "16_wooden_frame", files: ["P5250079.mp4", "P5250080.mp4", "P5250081.mp4", "P5250082.mp4", "P5250083.mp4", "P5260084.mp4"] },
  { folder: "17_product_box", files: ["P5260086.mp4", "P5260087.mp4", "P5260088.mp4", "P5260089.mp4", "P5260090.mp4", "P5260091.mp4"] },
  { folder: "18_large_bottle", files: ["P5260092.mp4", "P5260093.mp4", "P5260095.mp4", "P5260096.mp4", "P5260098.mp4", "P5260099.mp4"] },
  { folder: "19_storage_bin", files: ["P5260101.mp4", "P5260102.mp4", "P5260104.mp4"] },
  { folder: "20_large_box", files: ["P5260106.mp4", "P5260108.mp4", "P5260109.mp4"] },
  { folder: "21_storage_basket", files: ["P5260110.mp4", "P5260113.mp4", "P5260115.mp4"] },
  { folder: "22_stuffed_bunny", files: ["P5260124.mp4", "P5260126.mp4", "P5260127.mp4"] },
  { folder: "23_water_jug", files: ["P5260117.mp4", "P5260120.mp4", "P5260123.mp4"] },
];

function formatObjectName(folder) {
  const objectIndex = folder.slice(0, 2);
  const objectName = folder
    .slice(3)
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${objectIndex} ${objectName}`;
}

function buildObjectGallery({ folder, files }) {
  const objectIndex = folder.slice(0, 2);
  const modes = [];

  for (let start = 0; start < files.length; start += 3) {
    const modeIndex = start / 3 + 1;
    const poses = files.slice(start, start + 3).map((file) => ({
      src: `videos/all_objects/${folder}/${file}`,
    }));

    modes.push({
      id: `mode-${modeIndex}`,
      label: `Contact Mode ${modeIndex}`,
      poses,
    });
  }

  return {
    id: `object-${objectIndex}`,
    name: formatObjectName(folder),
    modes,
  };
}

const graspGallery = graspVideoSets.map(buildObjectGallery);

function getObjectModes(object) {
  return object.modes || [];
}

function setActiveButton(container, activeId) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === activeId);
  });
}

function renderPoseVideos(gallery, object, mode) {
  const poseGrid = gallery.querySelector("[data-pose-grid]");
  poseGrid.replaceChildren();

  mode.poses.forEach((pose, index) => {
    const card = document.createElement("article");
    card.className = "video-card pose-card";

    const title = document.createElement("div");
    title.className = "card-title";

    const label = document.createElement("span");
    label.textContent = `Pose ${index + 1}`;

    title.append(label);

    if (pose.src) {
      const video = document.createElement("video");
      video.src = pose.src;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      card.append(title, video);
    } else {
      const pending = document.createElement("div");
      pending.className = "pose-placeholder";
      pending.textContent = "Video pending";
      card.append(title, pending);
    }

    poseGrid.appendChild(card);
  });
}

function setGalleryMode(gallery, object, mode) {
  const modeTabs = gallery.querySelector("[data-mode-tabs]");
  const current = gallery.querySelector("[data-gallery-current]");
  const objectName = gallery.querySelector("[data-gallery-object]");
  const objectMeta = gallery.querySelector("[data-gallery-meta]");
  const modeLabel = gallery.querySelector("[data-gallery-mode]");
  const empty = gallery.querySelector("[data-gallery-empty]");

  empty.hidden = true;
  current.hidden = false;
  objectName.textContent = object.name;
  objectMeta.textContent = object.scale ? `Object scale: ${object.scale}` : "";
  modeLabel.textContent = mode.label;

  setActiveButton(modeTabs, mode.id);
  renderPoseVideos(gallery, object, mode);
}

function renderModeTabs(gallery, object) {
  const modeTabs = gallery.querySelector("[data-mode-tabs]");
  const current = gallery.querySelector("[data-gallery-current]");
  const objectName = gallery.querySelector("[data-gallery-object]");
  const objectMeta = gallery.querySelector("[data-gallery-meta]");
  const modeLabel = gallery.querySelector("[data-gallery-mode]");
  const poseGrid = gallery.querySelector("[data-pose-grid]");
  const empty = gallery.querySelector("[data-gallery-empty]");

  modeTabs.replaceChildren();

  const modes = getObjectModes(object);
  modes.forEach((mode) => {
    const button = document.createElement("button");
    button.className = "gallery-tab";
    button.type = "button";
    button.dataset.id = mode.id;
    button.textContent = mode.label;
    button.addEventListener("click", () => setGalleryMode(gallery, object, mode));
    modeTabs.appendChild(button);
  });

  if (modes.length > 0) {
    setGalleryMode(gallery, object, modes[0]);
  } else {
    current.hidden = false;
    objectName.textContent = object.name;
    objectMeta.textContent = "";
    modeLabel.textContent = "";
    poseGrid.replaceChildren();
    empty.hidden = false;
    empty.textContent = "No videos available for this object yet.";
  }
}

function setGalleryObject(gallery, object) {
  const objectTabs = gallery.querySelector("[data-object-tabs]");
  setActiveButton(objectTabs, object.id);
  renderModeTabs(gallery, object);
}

function renderObjectTabs(gallery) {
  const objectTabs = gallery.querySelector("[data-object-tabs]");
  objectTabs.replaceChildren();

  graspGallery.forEach((object) => {
    const button = document.createElement("button");
    button.className = "gallery-tab object-tab";
    button.type = "button";
    button.dataset.id = object.id;

    const name = document.createElement("span");
    name.textContent = object.name;
    button.appendChild(name);

    if (object.scale) {
      const scale = document.createElement("small");
      scale.textContent = object.scale;
      button.appendChild(scale);
    }

    button.addEventListener("click", () => setGalleryObject(gallery, object));
    objectTabs.appendChild(button);
  });

  if (graspGallery.length > 0) {
    setGalleryObject(gallery, graspGallery[0]);
  }
}

function initGraspGallery(gallery) {
  const empty = gallery.querySelector("[data-gallery-empty]");
  const controls = gallery.querySelector(".gallery-controls");

  if (graspGallery.length === 0) {
    controls.hidden = true;
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  controls.hidden = false;
  renderObjectTabs(gallery);
}

document.querySelectorAll("[data-grasp-gallery]").forEach(initGraspGallery);

function initCollapsibleSection(section) {
  const toggle = section.querySelector("[data-collapse-toggle]");
  const content = section.querySelector("[data-collapsible-content]");
  const label = section.querySelector("[data-collapse-label]");

  if (!toggle || !content) {
    return;
  }

  function setExpanded(isExpanded) {
    content.hidden = !isExpanded;
    toggle.setAttribute("aria-expanded", String(isExpanded));
    section.classList.toggle("is-expanded", isExpanded);
    section.classList.toggle("is-collapsed", !isExpanded);

    if (label) {
      label.textContent = isExpanded ? "Hide visualizations" : "Show visualizations";
    }
  }

  setExpanded(toggle.getAttribute("aria-expanded") === "true");
  toggle.addEventListener("click", () => {
    setExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });
}

document.querySelectorAll("[data-collapsible-section]").forEach(initCollapsibleSection);
