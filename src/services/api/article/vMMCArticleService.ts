import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { nSQL } from 'nano-sql';
import VMMCArticle from 'src/stores/models/article/VMMCArticle';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const vMMCArticle = useRepo(VMMCArticle);

const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

