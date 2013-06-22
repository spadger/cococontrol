using Microsoft.AspNet.SignalR;

namespace CocoCommand.Hubs
{
    public class CocoCommandHub : Hub
    {
        public static int CurrentStatus { get; set; }

        public void UpdateStatus(int status)
        {
            CurrentStatus = status;
            Clients.All.newStatus(status);
        }

        public void GetStatus()
        {
            Clients.Caller.newStatus(CurrentStatus);
        }
    }
}