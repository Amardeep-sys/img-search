const apiKey = "EOy2mq_5XKKZmr-fkHL1fJiEBm4yRXscilawKyUhUgo";
const apiURL = `https://api.unsplash.com/photos/?client_id=${apiKey}`;

const searchEvent_Dom = document.getElementById('form');
const imageContainerDom = document.getElementById('images');
const imageEelement = function (src){
    return `<img src=${src}></img>`;
}

let searchText = '';
let page = 1;

async function fetchData(searchText, isForNext = false, page = 1){
  if(searchText){
    const fetchData = await fetch(`https://api.unsplash.com/search/photos?query=${searchText}&client_id=${apiKey}&page=${page}`);

    if(fetchData.ok){
       const changeToArray = await fetchData.json();
       const fetched_images_array = changeToArray.results;
      //      DATA FETCHED SUCCESSFULLY
       fetched_images_array.forEach((element, index)  => {
        const regularImgUrl = element.urls.small;
        // CREATING IMAGE ELEMENT WITH ITS SRC AND PUTTING IT IN THE INNER HTML OF IMAGE CONTAINER
       const imageElement = document.createElement('img');
       imageElement.src = regularImgUrl;
      //   CONDITIONALLY PUTT THE VALUE OF IF NEXT OR NOT
       if(isForNext){
         imageContainerDom.innerHTML += imageEelement(regularImgUrl);
       }else{
      //  CONDITIONALLY PUT THE VALUE IN 'imageContainerDom' whether to append or overwrite
      page = 1 ;
        if(index === 0){
          imageContainerDom.innerHTML = imageEelement(regularImgUrl);
         }else{
          imageContainerDom.innerHTML += imageEelement(regularImgUrl);
         }

       }

       });
    }else{
      imageContainerDom.innerHTML = `<h1>${fetchData.status}</h1>`;
    }
  }
}

//     <<<<<  --- When document is loaded and all landing images to show ---  >>>>>
(function(){
   
})();

document.addEventListener('scroll', ()=>{
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if(scrollTop + clientHeight >= scrollHeight){
    fetchData(searchText, true, ++page);
    console.log(scrollTop, scrollHeight, clientHeight);
  }
});

searchEvent_Dom.addEventListener('submit', (x)=>{
    x.preventDefault();
    if(x.target[0].value.trim() != ''){
      const searchText = x.target[0].value.trim();
      fetchData(searchText, false);
    }
   searchText = x.target[0].value.trim();
});