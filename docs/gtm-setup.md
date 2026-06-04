# GTM & GA4 配置指南

## 快速导入

本项目已提供完整的 GTM 容器配置文件，可直接导入：

**文件**: [`gtm-container-export.json`](./gtm-container-export.json)

**导入步骤**:
1. 进入 [Google Tag Manager](https://tagmanager.google.com)
2. 选择容器 → **Admin** → **Import Container**
3. 选择 `gtm-container-export.json`
4. **Choose workspace**: 现有工作区或新建
5. **Choose import option**: Merge（推荐）或 Overwrite
6. 预览 → 提交 → 发布

导入后自动生成：
- ✅ GA4 配置标签（ID: `G-TPE6F6WZ5W`）
- ✅ 11 个数据层变量
- ✅ 7 个触发器（页面浏览 + 4 个自定义事件 + 滚动深度 + 出站链接）
- ✅ 7 个 GA4 事件标签
- ✅ 10 个内置变量

---

## 已部署的追踪代码

| 类型 | ID | 位置 |
|------|-----|------|
| Google Tag Manager | `GTM-NHT3BBNW` | `Layout.astro` <head> + <body> |
| Google Analytics 4 | `G-TPE6F6WZ5W` | `Layout.astro` <head> |

---

## 自定义事件清单

网站已在关键交互点注入 `dataLayer.push`，你只需在 GTM 中配置对应的**触发器**和**标签**。

### 事件 1: `view_name` — 查看名字详情

**触发时机**: 用户访问任意名字详情页（/name/brooks/ 等）

**dataLayer 变量**:
```json
{
  "event": "view_name",
  "name_name": "Brooks",
  "name_rank": 1,
  "name_gender": "Masculine",
  "name_origin": "English"
}
```

**GTM 配置步骤**:
1. **变量** → 用户定义变量 → 新建 **数据层变量**
   - 变量名称: `DLV - name_name`
   - 数据层变量名: `name_name`
   - 同样创建: `DLV - name_rank`, `DLV - name_gender`, `DLV - name_origin`

2. **触发器** → 新建 → 自定义事件
   - 事件名称: `view_name`
   - 触发条件: 无（所有触发）

3. **标签** → 新建 → Google Analytics: GA4 事件
   - 标签名称: `GA4 - view_name`
   - 配置代码: 选择你的 GA4 配置代码
   - 事件名称: `view_name`
   - 事件参数:
     - `name_name` → `{{DLV - name_name}}`
     - `name_rank` → `{{DLV - name_rank}}`
     - `name_gender` → `{{DLV - name_gender}}`
     - `name_origin` → `{{DLV - name_origin}}`
   - 触发条件: `view_name`

---

### 事件 2: `generate_spelling` — 生成拼写变体

**触发时机**: 用户在 Spelling Studio 点击名字或生成自定义拼写

**dataLayer 变量**:
```json
{
  "event": "generate_spelling",
  "spelling_name": "Ava",
  "spelling_variant_count": 9,
  "spelling_type": "preset"
}
```

**GTM 配置步骤**:
1. **变量** → 数据层变量
   - `DLV - spelling_name`
   - `DLV - spelling_variant_count`
   - `DLV - spelling_type`

2. **触发器** → 自定义事件: `generate_spelling`

3. **标签** → GA4 事件
   - 事件名称: `generate_spelling`
   - 参数映射到上述变量

---

### 事件 3: `generate_double_name` — 生成叠名

**触发时机**: 用户点击 "Generate New" 按钮

**dataLayer 变量**:
```json
{
  "event": "generate_double_name",
  "double_name_count": 8,
  "double_names": "Mary-Anne,Anna-Marie,..."
}
```

---

### 事件 4: `favorite_double_name` — 收藏/取消收藏叠名

**触发时机**: 用户点击心形按钮

**dataLayer 变量**:
```json
{
  "event": "favorite_double_name",
  "double_name": "Mary-Anne",
  "favorite_action": "add",
  "favorite_count": 3
}
```

---

## 推荐的标准配置

### 必建的数据层变量

| 变量名 | 数据层变量名 | 用途 |
|--------|-------------|------|
| `DLV - name_name` | `name_name` | 名字详情页 |
| `DLV - name_rank` | `name_rank` | 名字排名 |
| `DLV - name_gender` | `name_gender` | 名字性别 |
| `DLV - spelling_name` | `spelling_name` | 拼写名字 |
| `DLV - spelling_type` | `spelling_type` | preset/custom |
| `DLV - double_name` | `double_name` | 叠名 |
| `DLV - favorite_action` | `favorite_action` | add/remove |

### 必建的触发器

| 触发器名称 | 事件类型 |
|-----------|---------|
| `EVT - view_name` | `view_name` |
| `EVT - generate_spelling` | `generate_spelling` |
| `EVT - generate_double_name` | `generate_double_name` |
| `EVT - favorite_double_name` | `favorite_double_name` |

### 必建的 GA4 标签

| 标签名称 | 事件名 | 触发器 |
|---------|-------|-------|
| `GA4 - view_name` | `view_name` | EVT - view_name |
| `GA4 - generate_spelling` | `generate_spelling` | EVT - generate_spelling |
| `GA4 - generate_double_name` | `generate_double_name` | EVT - generate_double_name |
| `GA4 - favorite_double_name` | `favorite_double_name` | EVT - favorite_double_name |

---

## GA4 自定义维度（Custom Dimensions）

在 GA4 后台（Admin → Custom Definitions）创建:

| 维度名称 | 范围 | 事件参数 |
|---------|------|---------|
| Name | Event | `name_name` |
| Name Rank | Event | `name_rank` |
| Name Gender | Event | `name_gender` |
| Spelling Type | Event | `spelling_type` |
| Favorite Action | Event | `favorite_action` |

---

## 验证方法

1. 打开网站，按 F12 → Console
2. 输入 `dataLayer`，应看到非空数组
3. 访问名字详情页，应看到包含 `view_name` 事件的对象
4. 在 GTM 中点击 **预览** → 输入网站 URL → 验证事件是否触发

---

## 可选增强

### 滚动深度追踪
在 GTM 中新建触发器:
- 类型: **滚动深度**
- 垂直滚动深度: 25, 50, 75, 90
- 触发条件: 所有页面

### 出站链接点击
在 GTM 中新建触发器:
- 类型: **点击 - 仅链接**
- 触发条件: `Click URL` 不包含 `whatmeans.name`
