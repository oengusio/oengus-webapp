import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InitMFADto } from '../../../../model/auth';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-mfa-modal',
    templateUrl: './mfa-modal.component.html',
    styleUrls: ['./mfa-modal.component.scss'],
    standalone: false
})
export class MfaModalComponent {
  loading = false;
  mfaCodeIncorrect = false;
  mfaCode = '';
  @Output() mfaResult = new EventEmitter<boolean>();

  @Input() mfaSettings: InitMFADto = {
    qrCode: 'data:image/gif;base64,R0lGODlhhACEAJEAAAAAAP///wAAAAAAACH5BAEAAAIALAAAAACEAIQAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8chQNf2jeekzeRA7wsKKcKibsRb+IDG5m/idO5qzFs1GiRii1PalarcDqFgS1KxDHsP50S7ink/5BJ6II0u3/UIe59PtlYHOCjodpRnaOfHRhjBmPhk5oh3qEjp+GeotTmnZ6QpadkEUVn6ydXY6dAGqioa6sqK+Ig6ZgA5Gku7GHWKwykqu7fa0JqKiynlCRwojEwMy/x8G/11WVxp+rrbnFwM96qtbMWtVv6NrivOm3nerd7rbX1+PB8Kby89i51lHqnvGjV1+NjNy1Uw3Thw/6JhSUgvXT5b+4xRXFgRoph+/xovtmMYaSLHaSL9SWyoD2OwkhDDKfSFkiLLhr8ykjRY8WE9cnHchbyQktwweC4rIKTpjOjOakp/TgK57ulAeaSW5vRpEWpJnSe7RvwaMOZGWjXHhvV6FqxMnGODmV2LFq7akS/fun07sCPduXnZbpTh9KtAroBNpB0Ms7BhuYiXKS5x2CphGFSbCpbMWGzfxdk87m28OSpfFJVxtsT8WfNpEaXrhga9ejRS1h8JmtZ8lJ/JWvemBe180LPNQrvLYrW8zbVe21KTZ2X+/PfV4P1yRyfr+/jNuHbf3Xbd2qF24svbelfuF/jU8bxD452+vjp27tB77n1fFKNz6fZfq/9O7958fOViXX484VabZeVhVeB5l9E3E33hORfbSrPJBp5c+wlXE2mJidebVwpaZSFtjoEIHVUEClgUCIQNdSGF37XXRVUZqieQcVpd2CGJSf2nW4QPothfjj9CuB2KkaEnlZHkAfmckCqyF5uMgS0p2jBT7hjYgidKyaKDWw4nmpc2jqIfe1haWSaCXwI4YpAxhtmlm2eCGWKUc+bZo5xNwgmoiWS26GCJSgrX4JN/+mkUoo5y2SikFfKYpJbQuEiljzfWd+SAdHoqqaaH8tmpdCvKFypAj3KqKKisuspBmkwBpeGlYn5q6F1iLLcVg7h2qusWvAJ46qu5OmMekpv/Fpuons39BeVkovY56m7NwrZngKReCa2IG1iKo52GJjtkfyrdiuqgdoKrLnHncpsuppCmNeGB3t4LmZq1hovvmplqYB299g7pb6oZBLwvfFVmhm+RtFIXX3HI4jVpne4mDOPF3TVc6MT3fRgsuQgb/G61zb6HJQtjjhlnmxa3sLJQHCZJqAsxq8cfzR3bLHOespJZbMjdXpcaowLzGynKOvpndMI1t4dfdkU7iyHB/5oMsqgja8t0uTq3ym7BXfe6rcs0BkpkthVjXfbaBlZT8rC6ScvouNDEDSVobJopNnIzq/qmB6YyDKu4qEks+KoLx2s44Hd+MPjUOUvY8+OJqqd7tLUC0u3q3uhqjvnfaNpK+axg3634jGQrTOzVkXP9s94Dc04tu08/nfLOZr8NOuutyn123ZWijjS1wBuvO+94c/xy7i+7TanwzBMdT22ZO7zo7lJXD/H1D7dr9snEc08+9M9/7fXc1ovuPPUir7ph8Vq7jvLHu+rOLOFLvx+66VZDtTyoUWxdpPsf0BL0mAQqcIEMbKADHwjBCEpwghSsoAUviMEMSqAAADs=',
    secretKey: '12345',
  };

  constructor(private authService: AuthService) { }

  saveMfa(): void {
    if (!this.mfaCode) {
      return;
    }

    this.loading = true;
    this.mfaCodeIncorrect = false;

    this.authService.storeMfa(this.mfaCode).subscribe((result) => {
      this.loading = false;
      if (result.status) {
        this.mfaResult.emit(true);
      } else {
        // mfa code is not correct
        this.mfaCodeIncorrect = true;
        this.mfaCode = '';
      }
    });
  }

}
