    <template>
        <div class="app-container">
        <!-- 头部区域 -->
        <header v-if="groupedSlots.header.length" class="app-header">
            <component 
            v-for="(child, index) in groupedSlots.header"
            :is="child"
            :key="child.key || `header-${index}`"
            />
        </header>
    
        <div class="app-content">
            <!-- 侧边栏区域 -->
            <aside v-if="groupedSlots.sidebar.length" class="app-sidebar">
            <component 
                v-for="(child, index) in groupedSlots.sidebar"
                :is="child"
                :key="child.key || `sidebar-${index}`"
            />
            </aside>
    
            <!-- 主体内容 -->
            <main class="app-main">
            <component 
                v-for="(child, index) in groupedSlots.main"
                :is="child"
                :key="child.key || `main-${index}`"
            />
            </main>
        </div>
    
        <!-- 底部区域 -->
        <footer v-if="groupedSlots.footer.length" class="app-footer">
            <component 
            v-for="(child, index) in groupedSlots.footer"
            :is="child"
            :key="child.key || `footer-${index}`"
            />
        </footer>
        </div>
    </template>
    
  <script setup >

    import { computed, ref, useSlots } from 'vue';
    const slots = useSlots();
    

    const groupedSlots = computed(() => {
        const grouped = {header:[],sidebar:[],main:[],footer:[]};
        slots.default?.()[0].children.forEach((vnode) => {
            // 获取 position 属性，默认为 body
            const position = vnode.props?.position || 'main'
            
            // 根据 position 分配到对应分组，无效值默认到 body
            if (grouped[position]) {
            grouped[position].push(vnode)
            } else {
            grouped.body.push(vnode)
            }
        })
        return grouped
    });

  </script>

<style scoped>
:root {
  --header-height: 60px;
  --footer-height: 60px;
  --sidebar-width: 250px;
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --background-color: #f5f6fa;
  --text-color: #2c3e50;
  --border-color: #dcdde1;
}

.app-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background-color: var(--background-color);
}

.app-header {
  grid-row: 1;
  height: var(--header-height);
  background-color: var(--primary-color);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.nav-links a {
  text-decoration: none;
  margin-left: 20px;
  font-size: 16px;
}

.app-content {
  grid-row: 2;
  display: flex;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.app-sidebar {
  width: var(--sidebar-width);
  border-right: 1px solid var(--border-color);
  padding: 20px;
}

.sidebar-content ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.sidebar-content li {
  margin: 10px 0;
}

.sidebar-content a {
  color: var(--text-color);
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar-content a:hover {
  background-color: var(--background-color);
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.main-content {
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-footer {
  grid-row: 3;
  height: var(--footer-height);
  background-color: var(--secondary-color);
  padding: 0 20px;
}

.footer-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1, h2 {
  margin: 0;
}

p {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
