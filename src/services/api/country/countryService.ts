import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { nSQL } from 'nano-sql';
import Country from 'src/stores/models/country/Country';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const country = useRepo(Country);

const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();


