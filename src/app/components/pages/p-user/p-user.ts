import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user/user';
import { userRole } from '../../../core/enums/user-role';
import { Subscription } from 'rxjs';
import { HttpClientService } from '../../../services/http-client-service';
import { ComponentPortal } from '@angular/cdk/portal';
import { CEditModal } from '../../ui/c-edit-modal/c-edit-modal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserRegister } from '../../../models/user/user-register';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'p-user',
  imports: [FormsModule],
  templateUrl: './p-user.html',
  styleUrl: './p-user.scss',
})
export class PUser {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedRole: string = 'TODOS';
  url: string = "/users";
  service = inject(HttpClientService);
  private router = inject(Router);
  private subscription = new Subscription();

  userRole = userRole;

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData() {
    this.subscription.add(
      this.service.getAllArray<User>(this.url).subscribe({
        next: (users) => {
          this.users = users;
          this.filterUsers();
          console.log('Usuarios cargados:', this.users);
        },
        error: (error) => console.log('ERROR ' + error.status),
      })
    );
  }

  filterUsers() {
    if (this.selectedRole === 'TODOS') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => user.role === this.selectedRole);
    }
  }

  onRoleFilterChange() {
    this.filterUsers();
  }

  handleDelete(id: number): void {
    this.subscription.add(
      this.service.delete(this.url, id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        this.filterUsers();
      })
    );
  }

  protected handleCreate() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);

    const newUser: UserRegister = {
      name: '',
      password: '',
      role: userRole.ADMIN
    };

    componentRef.instance.object = newUser;
    componentRef.instance.method = "POST";
    componentRef.instance.apiurl = "/users/register";
    componentRef.instance.onBeforeSubmit = (obj: Record<string, any>) => {
      obj['role'] = userRole.ADMIN;
      return obj;
    };
    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }

  portal = new ComponentPortal(CEditModal);

  private overlay = inject(Overlay);
  private destroyRef = inject(DestroyRef);

  protected handleEdit(user: User) {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });

    const overlayRef = this.overlay.create(config);
    const componentRef = overlayRef.attach(this.portal);

    componentRef.instance.object = user;
    componentRef.instance.method = "PUT";
    componentRef.instance.apiurl = "/users";
    componentRef.instance.onBeforeSubmit = (obj: Record<string, any>) => {
      obj['role'] = user.role;
      return obj;
    };
    componentRef.instance.saved.subscribe(() => {
      this.getData();
      overlayRef.detach();
    });

    overlayRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => overlayRef.detach());
  }

}
