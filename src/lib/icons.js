import {
  Fence, PackageSearch, HardHat, ScanFace, CarFront, Users, Flame, Droplets,
  Gauge, BadgeCheck, GraduationCap, Pill, Factory, ConciergeBell, UtensilsCrossed,
  Truck, Video, Cpu, ShieldCheck, Zap, PlugZap, ScanEye, BellRing, TrendingUp,
  ArrowRight, ArrowUpRight, Check, Play, Menu, X, Phone, Mail, MapPin, Linkedin,
  Twitter, Youtube, Instagram, MessageCircle, Download, LogOut, RefreshCw, Lock, Sun, Moon,
} from "lucide-react";

export const ICONS = {
  Fence, PackageSearch, HardHat, ScanFace, CarFront, Users, Flame, Droplets,
  Gauge, BadgeCheck, GraduationCap, Pill, Factory, ConciergeBell, UtensilsCrossed,
  Truck, Video, Cpu, ShieldCheck, Zap, PlugZap, ScanEye, BellRing, TrendingUp,
  ArrowRight, ArrowUpRight, Check, Play, Menu, X, Phone, Mail, MapPin, Linkedin,
  Twitter, Youtube, Instagram, MessageCircle, Download, LogOut, RefreshCw, Lock, Sun, Moon,
};

export default function Icon({ name, className = "h-5 w-5", ...props }) {
  const Cmp = ICONS[name] || ShieldCheck;
  return <Cmp className={className} {...props} />;
}