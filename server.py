#!/usr/bin/env python3
"""
Simple HTTP Server for Portfolio Testing
Access your portfolio from mobile device on same network
"""

import http.server
import socketserver
import socket
import webbrowser
import os
import sys

def get_local_ip():
    """Get the local IP address"""
    try:
        # Connect to a remote server to get local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except:
        return "localhost"

def start_server(port=8000):
    """Start the HTTP server"""
    try:
        # Change to portfolio directory
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        # Get local IP
        local_ip = get_local_ip()
        
        # Create server
        handler = http.server.SimpleHTTPRequestHandler
        
        # Custom handler to set correct MIME types
        class CustomHTTPRequestHandler(handler):
            def end_headers(self):
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
                super().end_headers()
        
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            print(f"\n🚀 Portfolio Server Started!")
            print(f"📱 Local Access: http://localhost:{port}")
            print(f"📱 Mobile Access: http://{local_ip}:{port}")
            print(f"🌐 Network IP: {local_ip}")
            print(f"\n📋 To access from your mobile:")
            print(f"   1. Make sure mobile is on same WiFi")
            print(f"   2. Open browser on mobile")
            print(f"   3. Go to: http://{local_ip}:{port}")
            print(f"\n🛑 Press Ctrl+C to stop server\n")
            
            # Try to open browser automatically
            try:
                webbrowser.open(f"http://localhost:{port}")
            except:
                pass
            
            # Start server
            httpd.serve_forever()
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            start_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")
    except KeyboardInterrupt:
        print(f"\n\n✅ Server stopped successfully!")
        sys.exit(0)

if __name__ == "__main__":
    start_server()
