import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { nSQL } from 'nano-sql';
import Message from 'src/stores/models/messages/Message';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const message = useRepo(Message);

const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

