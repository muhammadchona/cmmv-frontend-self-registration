<template>
  <q-item clickable v-ripple>
    <q-item-section> {{ file.title }}</q-item-section>
    <q-item-section avatar>
      <q-btn
        flat
        color="primary"
        icon="file_download"
        no-caps
        @click.stop="getInfoDocsOrImagesById(file.id)"
      />
    </q-item-section>
  </q-item>
</template>
<script setup>
import infoDocsOrImagesSerice from '../../services/api/dorcOrImages/infoDocsOrImagesSerice';
import { useQuasar } from 'quasar';
import { useLoading } from 'src/composables/shared/loading/loading';

const { closeLoading, showloading } = useLoading();
const $q = useQuasar();

const props = defineProps(['file']);

const forceFileDownload = (materialEducativo, title, $q) => {
  if (typeof cordova !== 'undefined') {
    var UTF8_STR = new Uint8Array(materialEducativo.blop);
    var BINARY_ARR = UTF8_STR.buffer;
    var titleFile = removeAccentsSpacesAndParenthesis(title);
    var targetPath =
      cordova.file.externalRootDirectory + 'Download/' + titleFile;
    var base64String = arrayBufferToBase64(BINARY_ARR);
    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;

      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return btoa(binary);
    }
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
      console.log(cordova.file);
      console.log(FileTransfer);
      saveBlobToFile(UTF8_STR, targetPath);
    }
    function saveBlobToFile(blob, filePath) {
      var fileTransfer = new FileTransfer();

      fileTransfer.download(
        encodeURI('data:application/pdf;base64,' + base64String),
        filePath,
        function (entry) {
          console.log('File download success: ' + entry.toURL());
          openFile();
          // Handle success, you can do further actions here
        },
        function (error) {
          console.error('File download error: ' + JSON.stringify(error));
          // Handle error, you can do error handling here
        },
        false // Set to true if you want to trust all hosts (use with caution)
      );
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
    // var titleFile = titleFile1 + '.pdf';
    console.log('result' + titleFile);
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
      forceFileDownload(resp.data, resp.data.title, $q);
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
</script>
