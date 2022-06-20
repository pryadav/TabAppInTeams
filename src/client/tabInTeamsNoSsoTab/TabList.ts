export class TabList {
   
    public isTabPresent = (entityId: string) => {
        var storedColors = JSON.parse(localStorage.getItem("tab_list") as any); 
        //console.log(storedColors);
        return storedColors == null ? false: storedColors.includes(entityId);
    }

    public addTab = (entityId: string) => {
        var tabs: string[] = [];
        tabs.push(entityId);
        localStorage.setItem("tab_list", JSON.stringify(tabs)); //store colors
    }
  }
  