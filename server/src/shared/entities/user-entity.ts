import { BaseEntity } from "./base-entity";
import { Exclude, Expose } from "class-transformer";
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Gender, UserStatus, UserRole } from "../enums/user-enums";
import { Address } from "./address-entity";
import { SellerProfile } from "./seller-profile-entity";
import { Review } from "./review-entity";
import { RefundRequest } from "./refund-request-entity";
import { PaymentMethod } from "./payment-method-entity";

interface UserPreferences {
  timezone: string;
  twoFactorAuth: boolean;
  theme: "light" | "dark" | "system";
  notificationPreferences: {
    email: boolean;
    push: boolean;
    orderUpdates: boolean;
    promotions: boolean;
    sellerUpdates: boolean;
  };
}

interface UserActivity {
  lastPasswordChange: Date;
  lastProfileUpdate: Date;
  loginCount: number;
  devices: {
    id: string;
    name: string;
    type: string;
    lastUsed: Date;
    location: string;
    ipAddress: string;
  }[];
}

interface SocialLogin {
  provider: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * User Entity
 * Represents a user account in the e-commerce system.
 * Users can be customers, sellers, or administrators.
 */
@Entity("users")
export class User extends BaseEntity {
  // ========== CORE INFORMATION ==========

  /**
   * User's email address (must be unique)
   * @example 'user@example.com'
   */
  @Column({ unique: true })
  email: string;

  /**
   * Hashed password (excluded from serialization)
   * @exclude
   */
  @Column()
  @Exclude()
  password: string;

  /**
   * User's full legal name
   * @example 'John Doe'
   */
  @Column({ name: "full_names" })
  fullNames: string;

  /**
   * Display name shown to other users (optional)
   * @example 'JohnDoe42'
   */
  @Column({ name: "display_name", nullable: true })
  displayName: string;

  /**
   * Timestamp when user accepted terms and conditions
   */
  @Column({ name: "terms_accepted_at", type: "timestamp", nullable: true })
  termsAcceptedAt: Date;

  /**
   * Version of terms and conditions user accepted
   */
  @Column({ name: "terms_version", nullable: true })
  termsVersion: string;

  /**
   * User's phone number in E.164 format
   * @example '+1234567890'
   */
  @Column({ name: "phone_number", nullable: true })
  phoneNumber: string;

  /**
   * Whether the phone number has been verified
   * @default false
   */
  @Column({ name: "phone_verified", default: false })
  phoneVerified: boolean;

  /**
   * User's gender
   * @example Gender.MALE
   */
  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  /**
   * User's date of birth
   * @example '1990-01-01'
   */
  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth: Date;

  // ========== AUTHENTICATION & SECURITY ==========

  /**
   * Whether the user has verified their email address
   * @default false
   */
  @Column({ name: "is_email_verified", default: false })
  isEmailVerified: boolean;

  /**
   * Token for email verification (excluded from serialization)
   * @exclude
   */
  @Column({ name: "email_verification_token", nullable: true })
  @Exclude()
  emailVerificationToken: string;

  /**
   * Token for password reset (excluded from serialization)
   * @exclude
   */
  @Column({ name: "password_reset_token", nullable: true })
  @Exclude()
  passwordResetToken: string;

  /**
   * Expiration timestamp for the password reset token (excluded from serialization)
   * @exclude
   */
  @Column({ name: "password_reset_expires", type: "timestamp", nullable: true })
  @Exclude()
  passwordResetExpires: Date;

  /**
   * Whether two-factor authentication is enabled for this account
   * @default false
   */
  @Column({ name: "two_factor_enabled", default: false })
  twoFactorEnabled: boolean;

  /**
   * Secret key for two-factor authentication (excluded from serialization)
   * @exclude
   */
  @Column({ name: "two_factor_secret", nullable: true })
  @Exclude()
  twoFactorSecret: string;

  /**
   * Timestamp of the last successful login
   */
  @Column({ name: "last_login", type: "timestamp", nullable: true })
  lastLogin: Date;

  /**
   * Number of consecutive failed login attempts (excluded from serialization)
   * @exclude
   */
  @Column({ name: "login_attempts", default: 0 })
  @Exclude()
  loginAttempts: number;

  /**
   * Whether the account is currently locked due to too many failed login attempts
   * @default false
   */
  @Column({ name: "is_locked", default: false })
  isLocked: boolean;

  /**
   * Timestamp until the account is locked (if locked)
   */
  @Column({ name: "locked_until", type: "timestamp", nullable: true })
  lockedUntil: Date | null;

  // ========== PROFILE & PREFERENCES ==========

  /**
   * URL or path to the user's profile image
   * @example '/uploads/profiles/123e4567-e89b-12d3-a456-426614174000.jpg'
   */
  @Column({ name: "profile_image", nullable: true })
  profileImage: string;

  @Column({ name: "profile_picture_public_id", nullable: true })
  profilePicturePublicId: string;

  /**
   * User's preferred language code (ISO 639-1)
   * @default 'en'
   */
  @Column({ name: "preferred_language", default: "en" })
  preferredLanguage: string;

  /**
   * User's preferred currency code (ISO 4217)
   * @default 'USD'
   */
  @Column({ name: "preferred_currency", default: "USD" })
  preferredCurrency: string;

  /**
   * User's preferences for notifications and UI
   * @default {}
   */
  @Column({ type: "jsonb", default: () => "'{}'" })
  preferences: UserPreferences;

  /**
   * User activity and security information (excluded from serialization)
   * @exclude
   */
  @Column({ type: "jsonb", default: () => "'{}'" })
  @Exclude()
  activity: UserActivity;

  // ========== SELLER RELATIONSHIP ==========

  /**
   * Seller profile (if user is a seller)
   */
  @OneToOne(() => SellerProfile, (sellerProfile) => sellerProfile.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  sellerProfile: SellerProfile;

  /**
   * User's addresses
   */
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  /**
   * Whether the user is an approved seller
   * @readonly
   */
  @Expose({ name: "isSeller" })
  get isSeller(): boolean {
    return !!this.sellerProfile && this.sellerProfile.status === "APPROVED";
  }

  /**
   * ID of the default shipping address
   */
  @Column({ name: "default_shipping_address_id", nullable: true })
  defaultShippingAddressId: string;

  /**
   * Default shipping address
   */
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn({ name: "default_shipping_address_id" })
  defaultShippingAddress: Address;

  /**
   * ID of the default billing address
   */
  @Column({ name: "default_billing_address_id", nullable: true })
  defaultBillingAddressId: string;

  /**
   * Default billing address
   */
  @OneToOne(() => Address, { onDelete: "SET NULL" })
  @JoinColumn({ name: "default_billing_address_id" })
  defaultBillingAddress: Address;

  /**
   * User's saved payment methods
   */
  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => RefundRequest, (refundRequest) => refundRequest.user)
  refundRequests: RefundRequest[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  // ========== ACCOUNT STATUS & METADATA ==========

  /**
   * User's role in the system
   * @default UserRole.CUSTOMER
   */
  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  /**
   * Current status of the user account
   * @default UserStatus.PENDING
   */
  @Column({ type: "enum", enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  /**
   * Timestamp of the user's last activity
   */
  @Column({ name: "last_activity", type: "timestamp", nullable: true })
  lastActivity: Date;

  // ========== SOCIAL & EXTERNAL AUTH ==========

  /**
   * Social login connections (Google, Facebook, etc.)
   */
  @Column("jsonb", { nullable: true })
  socialLogins: SocialLogin[];

  /**
   * Initialize computed fields after loading from the database
   * @internal
   */
  /**
   * Initialize computed fields after loading from the database
   * @internal
   */
  @AfterLoad()
  afterLoad() {
    // Ensure preferences and activity are always properly initialized
    if (!this.preferences) {
      this.preferences = {
        language: "en",
        currency: "USD",
        timezone: "UTC",
        marketingEmails: false,
        newsletter: false,
        twoFactorAuth: false,
        theme: "system",
        notificationPreferences: {
          email: true,
          push: true,
          sms: false,
          orderUpdates: true,
          promotions: false,
          sellerUpdates: false,
        },
      } as UserPreferences;
    }

    if (!this.activity) {
      this.activity = {
        lastLogin: new Date(),
        lastPasswordChange: new Date(),
        lastProfileUpdate: new Date(),
        loginCount: 0,
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        devices: [],
      } as UserActivity;
    }
  }

  /**
   * Custom JSON serialization to exclude sensitive data
   * @returns User object with sensitive fields removed
   */
  toJSON() {
    // Exclude sensitive data when serializing to JSON
    const {
      password,
      twoFactorSecret,
      emailVerificationToken,
      passwordResetToken,
      passwordResetExpires,
      ...user
    } = this as any;
    return user;
  }
}
