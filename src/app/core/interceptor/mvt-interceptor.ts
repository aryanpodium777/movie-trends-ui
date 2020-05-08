import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class MvtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        console.log('Interceptor');
        // const headers=req.headers.set('',true);
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer 123') });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}