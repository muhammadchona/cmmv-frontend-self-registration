<template>
  <q-item clickable v-ripple>
    <q-item-section> {{ file.title }}</q-item-section>
    <q-item-section avatar>
      <q-btn
        flat
        color="primary"
        icon="file_download"
        no-caps
        v-if="showDownload"
        @click.stop="getInfoDocsOrImagesById(file.id)"
      />
    </q-item-section>
  </q-item>
</template>
<script setup>
import infoDocsOrImagesSerice from '../../services/api/dorcOrImages/infoDocsOrImagesSerice';
import { useQuasar, QSpinnerIos } from 'quasar';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSwal } from 'src/composables/shared/dialog/dialog';

const props = defineProps(['file', 'id', 'showDownload']);

const { closeLoading, showloading } = useLoading();
const { alertSucess, alertError, alertInfo, alertWarningAction } = useSwal();
const $q = useQuasar();

//props: ['file', 'id', 'showDownload']
const forceFileDownload = (materialEducativo, title, $q) => {
  if (typeof cordova !== 'undefined') {
    //   var blob = new Blob(materialEducativo.blop)
    //  const bytes = new Uint8Array(materialEducativo.blop)
    var UTF8_STR = new Uint8Array(materialEducativo.blop);
    var BINARY_ARR = UTF8_STR.buffer;
    var titleFile = removeAccentsSpacesAndParenthesis(title);
    console.log('result' + titleFile);
    saveBlob2File(titleFile, BINARY_ARR);
    function saveBlob2File(fileName, blob) {
      var folder = cordova.file.externalRootDirectory + 'Download';
      window.resolveLocalFileSystemURL(
        folder,
        function (dirEntry) {
          console.log('file system open: ' + dirEntry.name);
          console.log('file system open11111: ' + blob);
          createFile(dirEntry, fileName, blob);
          $q.loading.hide();
        },
        onErrorLoadFs
      );
    }
    function createFile(dirEntry, fileName, blob) {
      // Creates a new file
      dirEntry.getFile(
        fileName,
        { create: true, exclusive: false },
        function (fileEntry) {
          writeFile(fileEntry, blob);
        },
        onErrorCreateFile
      );
    }

    function writeFile(fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
          console.log('Successful file write...');
          openFile();
        };

        fileWriter.onerror = function (error) {
          console.log('Failed file write: ' + error);
        };
        fileWriter.write(dataObj);
      });
    }
    function onErrorLoadFs(error) {
      console.log(error);
    }

    function onErrorCreateFile(error) {
      console.log(error);
    }
    function openFile() {
      var strTitle = titleFile;
      console.log('file system 44444: ' + strTitle);
      var folder = cordova.file.externalRootDirectory + 'Download/' + strTitle;
      console.log('file system 2222: ' + folder);
      var documentURL = decodeURIComponent(folder);
      cordova.plugins.fileOpener2.open(documentURL, 'application/pdf', {
        error: function (e) {
          console.log('file system open3333366: ' + e + documentURL);
        },
      });
    }
  } else {
    const bytes = btoa(
      new Uint8Array(materialEducativo.blop).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    const url = 'data:application/pdf;base64, ' + bytes;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
  }
};

const getInfoDocsOrImagesById = (id) => {
  showloading();
  infoDocsOrImagesSerice
    .apiFetchById(id)
    .then((resp) => {
      //  offset = offset + 100
      console.log(resp.data);
      forceFileDownload(resp.data, resp.data.title + '.pdf', $q);
      closeLoading();
    })
    .catch((error) => {
      closeLoading();
      console.log(error);
    });
};

const removeAccentsSpacesAndParenthesis = (value) => {
  var val = value.replace(/\s/g, '').replace(/\(|\)/g, '');
  console.log('val11' + val);
  return val;
};
//    props: [],
</script>
