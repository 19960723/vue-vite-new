import { reactive } from 'vue';
import Vrouter from '@/router';
export default function () {
  const router = Vrouter;
  const backLeft = () => {
    console.log(router);
    router.back();
  };
  return { backLeft };
}
