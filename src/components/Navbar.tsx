import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Home, LayoutDashboard, Calendar } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Club Connect" className="h-10" />
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    My Calendar
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

